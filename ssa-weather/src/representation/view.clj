(ns representation.view
  
  (:use compojure.core, ring.adapter.jetty)
  (:require [compojure.route :as route]
            [compojure.handler :as handler]
            [representation.views.views :as views]))

(defroutes main-routes
  (GET "/" [] (views/welcome))
   (route/resources "/") 
  (GET "/nmf" [] (views/input-form))
  (POST "/result" {params :params} (views/nmf params))
  (route/not-found "404 Not Found"))

(def routes2 (handler/api main-routes))

(run-jetty routes2 {:port 8088})

