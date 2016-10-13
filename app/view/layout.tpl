<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{ project.name }}</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    {% for style in assets.styles %}
    <link rel="stylesheet" href="{{ style }}">
    {% endfor %}
    <script>
      window._PROJECT = {{ project | safe }}
      window._LOCALES = {{ locale | safe }}
    </script>
  </head>
  <body>
    <div id="app"></div>
    {% for script in assets.scripts %}
    <script src="{{ script }}"></script>
    {% endfor %}
  </body>
</html>
