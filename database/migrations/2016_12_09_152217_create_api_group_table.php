<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateApiGroupTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('api_group', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->index();
            $table->string('name');
            $table->string('desc')->nullable();
            $table->string('color', 20)->nullable();
            $table->string('icon')->nullable();
            $table->integer('order')->default(0)->index();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('api_group');
    }
}
