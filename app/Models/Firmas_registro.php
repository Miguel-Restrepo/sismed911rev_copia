<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Firmas_registro extends Model
{
    use HasFactory;
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    
    protected $table= "firmas_registro";
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
