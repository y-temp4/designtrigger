# require 'natto'
# require 'redcarpet'
# require 'redcarpet/render_strip'
require 'matrix'

namespace :post do
  desc "Make vector data to recommend posts"
  task make_vector_data: :environment do
    # 記事データを用意（Markdownの整形もする）
    posts = []
    renderer = Redcarpet::Render::HTML.new(filter_html: true)
    md = Redcarpet::Markdown.new(renderer)
    Post.all.each do |post|
      post_obj = {}
      post_obj[:id] = post.id
      without_md = Redcarpet::Markdown.new(Redcarpet::Render::StripDown)
                                      .render(post.body.delete(/\n/))
      post_obj[:body] = md.render(without_md).gsub(/<p>/, '').gsub(%r{<\/p>}, '')
      posts << post_obj
    end

    # 形態素解析による文章の分かち書き
    nm = Natto::MeCab.new
    wakati_posts = []
    posts.each do |post|
      post_obj = { id: post[:id], body: '' }
      post[:body].split('。').each_with_index do |words, i|
        nm.parse(words) do |n|
          post_obj[:body] += "#{n.surface} " if n.feature.match(/名詞/) || n.feature.match(/形容詞/)
        end
      end
      wakati_posts << post_obj
    end

    # 出現回数が低い単語を除外
    wakati_posts_modify = []
    wakati_posts.each do |post|
      post_obj = { id: post[:id], body: '' }
      array = post[:body].strip.split(' ')
      array.uniq.each do |word|
        array.delete word if array.count(word) < 6
      end
      post_obj[:body] += array.join(' ')
      wakati_posts_modify << post_obj
    end

    # 重複なし単語リストの生成
    uniq_word_list = []
    wakati_posts_modify.each do |post|
      array = post[:body].strip.split(' ')
      array.uniq.each do |word|
        uniq_word_list << word unless uniq_word_list.include?(word)
      end
    end

    # 各記事の特徴量を表すベクトルを生成
    vec = []
    wakati_posts_modify.each do |post|
      post_obj = { id: post[:id], vec: [] }
      uniq_word_list.each do |word|
        words = post[:body].split(' ')
        post_obj[:vec] << words.count(word)
      end
      vec << post_obj
    end

    dumped_vec = Marshal.dump vec
    File.open("#{Rails.root}/data/vec.dat", "w") { |f| f.write(dumped_vec.force_encoding("utf-8")) }
  end
end
