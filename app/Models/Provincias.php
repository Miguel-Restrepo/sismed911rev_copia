<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Provincias extends Model
{
    use HasFactory;
    protected $table= "provincias";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'cod_provincia';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
