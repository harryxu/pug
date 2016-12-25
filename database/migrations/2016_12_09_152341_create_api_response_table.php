<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateApiResponseTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('api_response', function(Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('request_id')->index();
            $table->string('content_type')->nullable();
            $table->integer('status_code');
            $table->text('body');

            $table->string('match_pattern')->nullable();

            $table->integer('order')->default(0)->index();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('api_response');
    }
}
