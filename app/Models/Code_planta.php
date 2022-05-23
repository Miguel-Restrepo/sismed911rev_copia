<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Code_planta extends Model
{
    use HasFactory;
    protected $table= "code_planta";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'idacode';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
