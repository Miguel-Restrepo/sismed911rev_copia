<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Division_hosp extends Model
{
    use HasFactory;
    protected $table= "division_hosp";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_division';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
