<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateApiSpecTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('api_spec', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->index();
            $table->integer('group_id')->nullable()->index();
            $table->string('path');
            $table->string('name')->nullable();
            $table->string('desc')->nullable();
            $table->string('method')->nullable()->comment('request method');

            $table->integer('default_response_id');
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
        Schema::drop('api_spec');
    }
}
