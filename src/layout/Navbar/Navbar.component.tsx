import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useActions } from '../../hooks';
import { useTypedSelector } from '../../hooks';
import { getKeyword } from '../../state';

const Navbar: React.FC = () => {
  const keyword = useTypedSelector(getKeyword);
  const { searchCards } = useActions();
  const history = useHistory();

  useEffect(() => {
    const params = new URLSearchParams();
    if (keyword) {
      params.append('keyword', keyword);
    } else {
      params.delete('keyword');
    }
    history.push({ search: params.toString() });
  }, [keyword, history]);

  return (
    <nav data-test="component-navbar" className="Navbar">
      <input
        data-test="component-search"
        className="Navbar__search"
        type="search"
        name="search"
        placeholder="Search Cards"
        value={keyword}
        onChange={(e) => searchCards(e.target.value)}
      />
    </nav>
  );
};

export default Navbar;
