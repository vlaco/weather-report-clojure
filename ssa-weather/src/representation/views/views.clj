(ns representation.views.views
  
  (:use [hiccup.core :as core]
        [hiccup.form :as form]
        [hiccup.page :as page]
        [hiccup-bridge.core :as conv]
        [representation.models.weather :as weather]))

(defn read-html
  [filename]
  "Wrap of convert process html to hiccup structure"
  (conv/html-file->hiccup filename))


(defn insert-jss
  [file-html scripts]
  (let [html (first file-html)
        head (second file-html)
        body   (conj (nth  file-html 2) (vec (conj (map (fn  [param]
                                                          (apply vec (page/include-js param))) scripts) :div)))]
    [ html head body])
)


(defn replace-css
  [html-file]
  "Replaces old css with new calls"
  (let[
       vec 
       (conj (second (first html-file)) 
             ;             (apply vec (page/include-css "http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"))
             (apply vec (page/include-css "css/bootstrap.min.css"))
             (apply vec (page/include-css "css/custom.css")))]
    (replace vec [0 1 2 3 6 7])))


(defn parse-html
  [filename]
  "Replaces old css with new calls"
  (let[html-file (read-html filename)
       new-head (replace-css html-file)]
    (insert-jss 
    (replace (conj (first html-file) new-head) [0 3 2])
    ["js/jquery.js" "js/bootstrap.min.js" "js/custom.js"])
    
    ))

(defn parse-vis
  [filename]
  "Replaces old css with new calls"
  (let[html-file (read-html filename)
       new-head (replace-css html-file) ]
    (insert-jss 
    (replace (conj (first html-file) new-head) [0 1 2 ])
    ["js/jquery.js" "js/d3.v3.min.js" "js/visualisation.js"])
    
    ))

(defn putDQuotes
  [vals]
 (clojure.string/replace vals #"," "','"))

(defn makeScript
  "make script form result of nmf"
  [params]
  (let [result (finance/get-all-feature-data params)]
    (for [feature result]
      (let [companies (nth feature 0)
            companiesV (nth feature 1)
            dates (nth feature 2)
            datesV (nth feature 3)
            numRes (.indexOf result feature)]
        (str "var companiesNames = ['" (putDQuotes companies) "'];"
             "var companiesValues = [" companiesV "];"
             "var datesNames = ['" (putDQuotes dates) "'];"
             "var datesValues = [" datesV "];"
             "createHeading(" (+ numRes 1) ");"
             "createSVG(companiesValues, companiesNames,datesValues,datesNames,returnColorset(" numRes ")," numRes");"))
      )
    ))


(defn input-form []
  (html
    (parse-html "resources/views/new.html")))


(defn nmf
  [params]
  (let [nmfed (finance/perform_nmf params)]
; (prn (html(parse-vis "resources/views/vis.html")))
  (html 
    (parse-vis "resources/views/vis.html")
        [:h2 "How to interpret results?"]
        [:img {:src "img/explanation.png"}]
        [:h1 "Results:"]
        [:script {:type "text/javascript"} 
         (apply str
               (makeScript nmfed)
                )])))




  
(defn welcome
  "Welcome (index) page"
  []
  (html
    [:body
     [:h3 {} "Welcome to finance pattern finder"]
     [:a {:href "/nmf"} "FIND PATTERNS!"]]))



(defn get_attr
  "Returns seq of attributes from sorted result from nmf
ex. ([AAPL 463.61488217404155] [XOM 85.05060715508867]"
  [sortedMatrix col]
  (loop [valuesd []
         sort sortedMatrix]
    (if (empty? (rest sort))
      (vec (reverse (cons (nth (first sort) (- col 1)) valuesd)))
      (recur (cons  (nth (first sort) (- col 1)) valuesd) (rest sort))))
  )

