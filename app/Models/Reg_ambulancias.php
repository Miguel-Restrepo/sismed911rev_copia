<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reg_ambulancias extends Model
{
    use HasFactory;
    protected $table= "reg_ambulancias";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_regamb';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
