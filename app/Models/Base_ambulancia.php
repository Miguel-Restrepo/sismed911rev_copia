<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Base_ambulancia extends Model
{
    use HasFactory;
    protected $table= "base_ambulancia";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_base';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
