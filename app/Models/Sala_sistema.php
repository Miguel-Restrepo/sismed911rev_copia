<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sala_sistema extends Model
{
    use HasFactory;
    protected $table= "sala_sistema";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_sistema';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
