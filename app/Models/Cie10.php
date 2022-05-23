<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cie10 extends Model
{
    use HasFactory;
    protected $table= "cie10";
    protected $keyType = 'string';
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'codigo_cie';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
