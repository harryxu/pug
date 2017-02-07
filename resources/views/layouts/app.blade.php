<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Pug') }}</title>

  @section('style')
    <link href="{{asset('css/semantic-ui/semantic.min.css')}}" rel="stylesheet">
    <link href="//cdn.bootcss.com/codemirror/5.23.0/codemirror.min.css" rel="stylesheet">
  @show

    <script>
        window.Laravel = <?php echo json_encode([
                'csrfToken' => csrf_token(),
        ]); ?>
    </script>
</head>
<body>

    @yield('content')

</body>
</html>
