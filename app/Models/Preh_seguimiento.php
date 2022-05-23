<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Preh_seguimiento extends Model
{
    use HasFactory;
    protected $table= "preh_seguimiento";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_seguimiento';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
