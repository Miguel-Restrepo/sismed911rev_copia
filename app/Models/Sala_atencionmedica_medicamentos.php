<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sala_atencionmedica_medicamentos extends Model
{
    use HasFactory;
    protected $table= "sala_atencionmedica_medicamentos";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_atencionmedica_medicamentos';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
