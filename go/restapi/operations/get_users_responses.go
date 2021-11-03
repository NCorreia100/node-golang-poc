// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"node-go-poc/go/models"
)

// GetUsersOKCode is the HTTP code returned for type GetUsersOK
const GetUsersOKCode int = 200

/*GetUsersOK OK

swagger:response getUsersOK
*/
type GetUsersOK struct {

	/*
	  In: Body
	*/
	Payload []*models.User `json:"body,omitempty"`
}

// NewGetUsersOK creates GetUsersOK with default headers values
func NewGetUsersOK() *GetUsersOK {

	return &GetUsersOK{}
}

// WithPayload adds the payload to the get users o k response
func (o *GetUsersOK) WithPayload(payload []*models.User) *GetUsersOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get users o k response
func (o *GetUsersOK) SetPayload(payload []*models.User) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetUsersOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	payload := o.Payload
	if payload == nil {
		// return empty array
		payload = make([]*models.User, 0, 50)
	}

	if err := producer.Produce(rw, payload); err != nil {
		panic(err) // let the recovery middleware deal with this
	}
}

// GetUsersNotFoundCode is the HTTP code returned for type GetUsersNotFound
const GetUsersNotFoundCode int = 404

/*GetUsersNotFound List is empty

swagger:response getUsersNotFound
*/
type GetUsersNotFound struct {

	/*
	  In: Body
	*/
	Payload *models.NotFoundError `json:"body,omitempty"`
}

// NewGetUsersNotFound creates GetUsersNotFound with default headers values
func NewGetUsersNotFound() *GetUsersNotFound {

	return &GetUsersNotFound{}
}

// WithPayload adds the payload to the get users not found response
func (o *GetUsersNotFound) WithPayload(payload *models.NotFoundError) *GetUsersNotFound {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get users not found response
func (o *GetUsersNotFound) SetPayload(payload *models.NotFoundError) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetUsersNotFound) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(404)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
