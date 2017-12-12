# DesignTrigger

## Deploy to heroku

```
$ heroku create
$ heroku buildpacks:set heroku/ruby
$ heroku buildpacks:add --index 1 heroku/nodejs
$ git push heroku master
```
