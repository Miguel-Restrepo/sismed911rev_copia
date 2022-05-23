<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Especial_ambulancia extends Model
{
    use HasFactory;
    protected $table= "especial_ambulancia";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_especialambulancia';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
    protected $guarded= [];//especifica que quiere ignorar
}
