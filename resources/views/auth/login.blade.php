@extends('layouts.app')

@section('style')
  @parent
  <style type="text/css">
    body {
      background-color: #ececec;
    }
    body > .grid {
      height: 100%;
    }
    .column {
      max-width: 450px;
    }
  </style>
@endsection

@section('content')

  <div class="ui middle aligned center aligned grid">
    <div class="column">
      <h2 class="ui teal image header">
        <div class="content">
          登录
        </div>
      </h2>
      <form class="ui large form" role="form" method="POST" action="{{ url('/login') }}">
        {{ csrf_field() }}

        @if(!$errors->isEmpty())
          <div class="ui error message" style="display: block;">
            <div class="list">
              @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
              @endforeach
            </div>
          </div>
        @endif

        <div class="ui stacked segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input id="username" type="text" name="username" value="{{ old('username') }}" placeholder="用户名" required autofocus>
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input id="password" type="password" placeholder="密码" name="password" required>
            </div>
          </div>
          <button class="ui fluid large teal primary button">登录</button>
        </div>


      </form>
    </div>
  </div>
@endsection
