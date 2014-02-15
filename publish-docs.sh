cd ../skinny

#generate the dist
grunt build

if [ $? != 0 ]
then
    exit $?
fi

cd ../skinnysite

# Build the site
grunt

if [ $? != 0 ]
then
    exit $?
fi

# Go back to skinny, where the gh-pages branch is.
# We need to put the site there
cd ../skinny
git checkout gh-pages

if [ $? != 0 ]
then
    exit $?
fi

# Clear the directory of anything that could cause a conflict
git fetch origin
git reset --hard origin/gh-pages

cp -R ../skinnysite/site/_site/* .

git add -A
git commit -m "Updating documentation"

if [ $? != 0 ]
then
    exit $?
fi

git push

if [ $? != 0 ]
then
    exit $?
fi

git checkout master