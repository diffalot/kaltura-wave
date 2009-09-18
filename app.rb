require 'sinatra'
require 'haml'
require 'kaltura-ruby'

get '/gadget/:kaltura_entry_id' do
  @kaltura_entry_id = params['kaltura_entry_id']
  haml gadget
end
