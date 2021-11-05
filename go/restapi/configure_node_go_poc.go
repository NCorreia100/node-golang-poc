// This file is safe to edit. Once it exists it will not be overwritten

package restapi

import (
	"crypto/tls"
	"fmt"
	"net/http"
	"node-go-poc/go/models"
	"node-go-poc/go/restapi/operations"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime"
	"github.com/go-openapi/runtime/middleware"
)

var userList =make([]*models.User,0)
var id int64 = 1
var name ="Jack Sullivan"
var age int64 = 434
var u1 = models.User{
	ID: id,
	Name: &name,
	Age: &age,
}


func getUsers() []*models.User{

return userList
}

func saveUser(u *models.User)*models.User{
var uId int64 = 1 //default
 if( len(userList) > 0){
 uLast := userList[len(userList)-1]
 uId = uLast.ID +1
 }

var newU = models.User{
 ID: uId,
 Name: u.Name,
 Age: u.Age,
}

userList = append(userList, &newU)

return userList[uId-1]
} 

//go:generate swagger generate server --target ../../go --name NodeGoPoc --spec ../../swagger.yaml --principal interface{}

func configureFlags(api *operations.NodeGoPocAPI) {
	// api.CommandLineOptionsGroups = []swag.CommandLineOptionsGroup{ ... }
}

func configureAPI(api *operations.NodeGoPocAPI) http.Handler {
	// configure the api here
	api.ServeError = errors.ServeError

	// Set your custom logger if needed. Default one is log.Printf
	// Expected interface func(string, ...interface{})
	//
	// Example:
	// api.Logger = log.Printf

	api.UseSwaggerUI()
	// To continue using redoc as your UI, uncomment the following line
	// api.UseRedoc()

	api.JSONConsumer = runtime.JSONConsumer()

	api.JSONProducer = runtime.JSONProducer()

	// if api.GetUsersHandler == nil {
		api.GetUsersHandler = operations.GetUsersHandlerFunc(func(params operations.GetUsersParams) middleware.Responder {
			return operations.NewGetUsersOK().WithPayload(getUsers())
		})

		api.SaveUserHandler = operations.SaveUserHandlerFunc(func(params operations.SaveUserParams)middleware.Responder{
			if(params.User==nil || params.User.Name ==nil || params.User.Age==nil){
				return operations.NewSaveUserPreconditionFailed()
			}
		savedU := saveUser(params.User)
			fmt.Printf("New User Added: {id: %+v, name: %+v, age: %+v}\n", savedU.ID,*savedU.Name,*savedU.Age)
		return operations.NewSaveUserCreated().WithPayload(savedU)
		})

	api.PreServerShutdown = func() {}

	api.ServerShutdown = func() {}

	return setupGlobalMiddleware(api.Serve(setupMiddlewares))
}

// The TLS configuration before HTTPS server starts.
func configureTLS(tlsConfig *tls.Config) {
	// Make all necessary changes to the TLS configuration here.
}

// As soon as server is initialized but not run yet, this function will be called.
// If you need to modify a config, store server instance to stop it individually later, this is the place.
// This function can be called multiple times, depending on the number of serving schemes.
// scheme value will be set accordingly: "http", "https" or "unix".
func configureServer(s *http.Server, scheme, addr string) {
}

// The middleware configuration is for the handler executors. These do not apply to the swagger.json document.
// The middleware executes after routing but before authentication, binding and validation.
func setupMiddlewares(handler http.Handler) http.Handler {
	return handler
}

// The middleware configuration happens before anything, this middleware also applies to serving the swagger.json document.
// So this is a good place to plug in a panic handling middleware, logging and metrics.
func setupGlobalMiddleware(handler http.Handler) http.Handler {
	return handler
}
