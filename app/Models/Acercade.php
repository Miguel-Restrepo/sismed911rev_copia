<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Acercade extends Model
{
    use HasFactory;
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_acerca';//Define id
    protected $table= "acercade";
    //protected $fillable= [''];//Especifica los campo a guardar
    protected $guarded= [];//especifica que quiere ignorar
}
