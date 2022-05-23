<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sede_sismed extends Model
{
    use HasFactory;
    protected $table= "sede_sismed";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_sede';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
