<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Preh_cierre extends Model
{
    use HasFactory;
    protected $table= "preh_cierre";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_cierre';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
