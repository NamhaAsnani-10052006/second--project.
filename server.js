    "use strict";

    const express = require("express");
    const path = require("path");

    const app = express();

    const PORT = 3000;


    /* =====================================================
    MIDDLEWARE
    ===================================================== */

    app.use(
        express.json()
    );


    app.use(
        express.urlencoded({
            extended: true
        })
    );


    /*
    Your whole SEON frontend folder
    becomes public.
    */

    app.use(
        express.static(
            __dirname
        )
    );


    /* =====================================================
    HEALTH CHECK
    ===================================================== */

    app.get(
        "/api/health",
        (req, res) => {

            res.json({

                status:
                    "online",

                service:
                    "SEON Backend",

                time:
                    new Date().toISOString()

            });

        }
    );


    /* =====================================================
    ORDER STORAGE
    TEMPORARY DEVELOPMENT STORAGE
    ===================================================== */

    const orders = [];


    /* =====================================================
    CREATE ORDER
    ===================================================== */

    app.post(
        "/api/orders",
        (req, res) => {

            try {

                const {

                    name,
                    email,
                    phone,
                    address,
                    paymentMethod,
                    items,
                    total

                } = req.body;


                if (
                    !name ||
                    !email ||
                    !phone ||
                    !address ||
                    !paymentMethod ||
                    !Array.isArray(items) ||
                    !items.length
                ) {

                    return res
                        .status(400)
                        .json({

                            success:
                                false,

                            message:
                                "Incomplete order details."

                        });

                }


                const order = {

                    orderId:
                        `SEON-${Date.now()}`,

                    customer: {

                        name,
                        email,
                        phone,
                        address

                    },

                    paymentMethod,

                    items,

                    total,

                    status:
                        "pending",

                    createdAt:
                        new Date().toISOString()

                };


                orders.push(order);


                console.log(
                    "NEW SEON ORDER:",
                    order
                );


                res.status(201).json({

                    success:
                        true,

                    orderId:
                        order.orderId,

                    message:
                        "Order created successfully."

                });


            } catch (error) {

                console.error(
                    error
                );


                res
                    .status(500)
                    .json({

                        success:
                            false,

                        message:
                            "Server error."

                    });

            }

        }
    );


    /* =====================================================
    GET ORDERS
    DEVELOPMENT ONLY
    ===================================================== */

    app.get(
        "/api/orders",
        (req, res) => {

            res.json({

                success:
                    true,

                count:
                    orders.length,

                orders

            });

        }
    );


    /* =====================================================
    HOME
    ===================================================== */

    app.get(
        "/",
        (req, res) => {

            res.sendFile(
                path.join(
                    __dirname,
                    "ghh.html"
                )
            );

        }
    );


    /* =====================================================
    404
    ===================================================== */

    app.use(
        (req, res) => {

            res.status(404).send(`

                <h1>
                    SEON — 404
                </h1>

                <p>
                    Page not found.
                </p>

                <a href="/ghh.html">
                    Return Home
                </a>

            `);

        }
    );


    /* =====================================================
    SERVER
    ===================================================== */

    app.listen(
        PORT,
        () => {

            console.log(
                `SEON server running at http://localhost:${PORT}`
            );

        }
    );