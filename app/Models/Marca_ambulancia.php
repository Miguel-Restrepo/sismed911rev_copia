<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marca_ambulancia extends Model
{
    use HasFactory;
    
    protected $table= "marca_ambulancia";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
