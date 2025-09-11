<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="author" content="Harveryteck Inc.">
  <meta http-equiv="cache-control" content="no-cache">
  <meta http-equiv="expires" content="0">
  <meta http-equiv="pragma" content="no-cache">

  <title>@yield('title')</title>

  <!-- Correct Vite -->
  @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="overflow-hidden max-sm:overflow-auto bg-main">
  <div id="app">
    @yield('content')
  </div>
</body>
</html>
