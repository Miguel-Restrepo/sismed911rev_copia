<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Antecedentes_registro extends Model
{
    use HasFactory;
    protected $table= "antecedentes_registro";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
