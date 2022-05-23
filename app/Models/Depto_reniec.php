<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Depto_reniec extends Model
{
    use HasFactory;
    protected $table= "depto_reniec";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'cod_dpto';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
