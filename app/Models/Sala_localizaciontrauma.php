<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sala_localizaciontrauma extends Model
{
    use HasFactory;
    protected $table= "sala_localizaciontrauma";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_localizaciontrauma';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
