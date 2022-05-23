<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Distrito_reniec extends Model
{
    use HasFactory;
    protected $table= "distrito_reniec";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'cod_distrito';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
