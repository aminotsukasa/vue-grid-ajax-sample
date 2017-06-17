<?php
header('Content-Type: text/json');
echo json_encode(

    [
        [
            "branch" => "master",
            "bin_start" => "0",
            "bin_end" => "199",
        ],
        [
            "branch" => "feature-hoge",
            "bin_start" => "200",
            "bin_end" => "250",
        ],
    ]

);

