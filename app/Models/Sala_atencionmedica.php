<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sala_atencionmedica extends Model
{
    use HasFactory;
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_atencionmedica';//Define id
    protected $table= "sala_atencionmedica";
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
