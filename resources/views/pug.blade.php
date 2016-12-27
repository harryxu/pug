<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
  <link href="//cdn.bootcss.com/semantic-ui/2.2.6/semantic.min.css" rel="stylesheet">
  <link href="//cdn.bootcss.com/react-select/1.0.0-rc.2/react-select.min.css" rel="stylesheet">

  <link rel="stylesheet" href="{{asset('css/style.css')}}">
  <title>Pug</title>
</head>

<body>
  <div id="app"></div>

  <script>
    var baseUrl = '{{ url('') }}';
    var basePath = '{{ $basePath }}';
    var apiBase = '{{url('/webapi')}}';
  </script>

  <script src="{{url('webapi/scripts')}}"></script>

  <script src="{{asset('js/vendor.production.js')}}"></script>
  <script src="{{asset('js/uilib.production.js')}}"></script>
  <script src="{{asset('js/app.production.js')}}"></script>
</body>

</body>
</html>
