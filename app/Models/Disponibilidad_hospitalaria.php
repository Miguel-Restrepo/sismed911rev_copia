<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disponibilidad_hospitalaria extends Model
{
    use HasFactory;
    protected $table= "disponibilidad_hospitalaria";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_disponiilida';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
