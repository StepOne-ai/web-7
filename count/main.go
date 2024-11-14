package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type CountResponse struct {
	Count int `json:"count"`
}

type CountRequest struct {
	Count int `json:"count"`
}

var count int = 0

func countHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		// receive json
		var request CountRequest
		if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		count += request.Count
	}

	if count == 0 {
		w.Header().Set("Content-Type", "application/json")

		if err := json.NewEncoder(w).Encode(CountResponse{Count: 0}); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	} else {
		response := CountResponse{Count: count}

		w.Header().Set("Content-Type", "application/json")

		if err := json.NewEncoder(w).Encode(response); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}
}

func main() {
	// Use a CORS middleware if needed
	http.Handle("/count", addCORS(http.HandlerFunc(countHandler)))

	// Start the server
	fmt.Println("Server running on port 8081")
	if err := http.ListenAndServe(":8081", nil); err != nil {
		fmt.Println("Failed to start server:", err)
	}
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
