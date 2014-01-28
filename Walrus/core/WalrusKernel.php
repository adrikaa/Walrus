<?php
/**
 * Author: Walrus Team
 * "Created: 16:10 13/12/13
 */

namespace Walrus\core\Kernel;

use ActiveRecord\Config;
use Walrus\core\route;

class WalrusKernel
{

    public static function execute()
    {

        self::bootstrap();

        $mux = new route\Route();

        $mux->add('/product', array('HelloController','doHelloWorld'));
        $mux->add('/product/:id', array('HelloController','doHelloWorld'), array(
            'require' => array('id' => '\d+', ),
            'default' => array( 'id' => '1', )
        ));
        $route = $mux->dispatch('/product/1');
        route\Executor::execute($route);
    }

    private static function bootstrap()
    {
        // Initializing php-activerecord
        Config::initialize(function($cfg)
        {
            $cfg->set_model_directory(ROOT_PATH . 'Walrus/models/');
            $cfg->set_connections(
                array(
                    'development' => 'mysql://root:root@localhost/walrus_dev'
                )
            );
        });

    }
}
