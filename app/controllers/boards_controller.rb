class BoardsController < ApplicationController
  def index
  end

  def show
    @board = Board.find(params[:id])
    render json: @board
  end
end
