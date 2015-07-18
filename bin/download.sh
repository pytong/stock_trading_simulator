#! /bin/bash

# Execution command:
# To download data for all stocks specified in data/symbols.txt
# ./bin/download_yahoo.sh
# To download data for one stock only
# ./bin/download_yahoo.sh AAPL

echo $1

stock_directory="../data/stocks"
mkdir -p $stock_directory;


if [[ $1 ]]
then
  rm -rf $stock_directory/$1.csv
  curl -o $stock_directory/temp.csv "http://ichart.finance.yahoo.com/table.csv?s=$1&a=00&b=1&c=2001&d=10&e=28&f=2015&g=d&ignore=.csv"
  cat $stock_directory/temp.csv | grep "2000-\|2001-\|2002-\|2003-\|2004-\|2005-\|2006-\|2007-\|2008-\|2009-\|2010-\|2011-\|2012-\|2013-\|2014-\|2015-" > $stock_directory/$1.csv

  rm -rf $stock_directory/temp.csv
else
  FILE="../data/symbols.txt"

  exec 0<"$FILE"

  n=0
  while read -r symbol
  do
    echo $symbol
    rm -rf $stock_directory/$symbol.csv
    curl -o $stock_directory/temp.csv "http://ichart.finance.yahoo.com/table.csv?s=$symbol&a=00&b=1&c=2001&d=10&e=28&f=2015&g=d&ignore=.csv"
    cat $stock_directory/temp.csv | grep "2000-\|2001-\|2002-\|2003-\|2004-\|2005-\|2006-\|2007-\|2008-\|2009-\|2010-\|2011-\|2012-\|2013-\|2014-\|2015-" > $stock_directory/$symbol.csv

   rm -rf $stock_directory/temp.csv
  done
fi


