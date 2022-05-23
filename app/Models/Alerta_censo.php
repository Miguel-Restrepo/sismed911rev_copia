<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alerta_censo extends Model
{
    use HasFactory;
    protected $table= "alerta_censo";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_tiempocenso';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
