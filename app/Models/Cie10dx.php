<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cie10dx extends Model
{
    use HasFactory;
    protected $table= "cie10dx";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'codcie10';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
