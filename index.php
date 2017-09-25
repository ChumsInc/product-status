<?php
/**
 * @package Chums Inc
 * @subpackage Imprint Status
 * @author Steve Montgomery
 * @copyright Copyright &copy; 2011, steve
 */

require_once ("autoload.inc.php");
require_once ("access.inc.php");

enable_error_reporting(true);

$bodyPath = "reports/admin/product-status";
$title = "Product Status";

$ui = new WebUI($bodyPath, $title, '');
$ui->version = "2017.02.08.1331";

$ui->AddCSS('public/product-status.css');
$ui->AddJS("public/js/manifest.d41d8cd98f00b204e980.js");
$ui->addChunkManifest('public/js/chunk-manifest.json');
$ui->Send();
