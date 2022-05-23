<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sector_hospital extends Model
{
    use HasFactory;
    protected $table= "sector_hospital";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_sector';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
