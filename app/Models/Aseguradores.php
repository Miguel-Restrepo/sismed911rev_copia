<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aseguradores extends Model
{
    use HasFactory;
    protected $table= "aseguradores";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_asegurador';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
