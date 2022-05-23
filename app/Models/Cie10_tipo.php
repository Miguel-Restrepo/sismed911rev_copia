<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cie10_tipo extends Model
{
    use HasFactory;
    protected $table= "cie10_tipo";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'COD';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
