package main

import (
	"fmt"
	"net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello, web!")
}

// Middleware function to add CORS headers to responses
func addCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://127.0.0.1:8000")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Handle preflight requests
		w.WriteHeader(http.StatusOK)

		next.ServeHTTP(w, r)
	})
}

func main() {
	http.Handle("/get", addCORS(http.HandlerFunc(helloHandler)))
	fmt.Println("Server is listening on port 8082")
	http.ListenAndServe(":8082", addCORS(http.HandlerFunc(helloHandler)))
}
