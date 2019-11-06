#   heroku container:push web --context-path .. -a amos-web \
# && heroku container:release web -a amos-web
   heroku container:push web -a amos-web \
&& heroku container:release web -a amos-web
