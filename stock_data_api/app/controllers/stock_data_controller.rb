class StockDataController < ApplicationController

  def index
    render plain: File.read("#{Rails.root.parent}/data/symbols.txt")
  end

  def show
    render plain: File.read("#{Rails.root.parent}/data/stocks/#{params[:symbol]}.csv")
  end
end
