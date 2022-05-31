import React, { useState } from "react";
import { Verktøy, Kategorier } from "../../data"
import { LinkPanel, Link, Alert, Heading, SearchField, Button, Label } from "@navikt/ds-react";
import { Search, Close } from "@navikt/ds-icons";

function MySearch() {
  const [foundUsers, setFoundUsers] = useState(people);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [searchActivate, setSearchActivate] = useState("");
  const [error, setError] = useState("");
  const [errorclass, setErrorclass] = useState("navds-search-field__input navds-text-field__input navds-body-short navds-body-medium");
  const people = Verktøy;
  const category = Kategorier;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchActivate("Active")
    // console.log(e.target[0].value);
    if (!e.target[0].value) {
      setError("Du må fylle inn søkefeltet")
      setErrorclass("navds-text-field--error navds-search-field__input navds-text-field__input navds-body-short navds-body-medium")
    }
  };

  const handleSearchChange = (e) => {
    setValue(e.target.value)
    setError("")
    setSearch("")
    setSearchActivate("")
    setErrorclass("navds-search-field__input navds-text-field__input navds-body-short navds-body-medium")
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = people.tools.filter((tool) => {
        return tool.name.toLowerCase().includes(keyword.toLowerCase()) || tool.description.toLowerCase().includes(keyword.toLowerCase()) || tool.category.startsWith(keyword)
      });
      setFoundUsers(results);
    }
  };

  const setCategory = (e) => {
    setValue(e.target.value)
    setError("")
    setSearch("")
    setSearchActivate("Aktiv")
    setErrorclass("navds-search-field__input navds-text-field__input navds-body-short navds-body-medium")
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = people.tools.filter((tool) => {
        return tool.name.toLowerCase().includes(keyword.toLowerCase()) || tool.description.toLowerCase().includes(keyword.toLowerCase()) || tool.category.startsWith(keyword)
      });
      setFoundUsers(results);
    }
  };

  return (
    <>
      <form role="search" className="rediger" onSubmit={handleSearchSubmit}>
        <SearchField label="Søk etter verktøy" error={error}>
          <SearchField.Input className={errorclass} value={value} onChange={handleSearchChange} autofocus="autofocus" />
          {!!value && (
            <SearchField.Clear onClick={() => setValue("") & setSearchActivate("")} type="button">
              <Close /> Tøm
            </SearchField.Clear>
          )}
          <SearchField.Button type="submit">
            <Search /> Søk
          </SearchField.Button>
        </SearchField>
      </form>

      {!search && !value &&
        <>
          <Button type="submit" size="xsmall" className="rediger card__micro" value="#analyse" onClick={() => setSearch("True") & setValue("") & setError("")}>Kategorier</Button> 
          {/* <Button type="submit" size="xsmall" className="rediger card__micro" value="#hjelpeartikler" onClick={setCategory}>Hjelpeartikler</Button> */}
          {/* <Button type="submit" size="xsmall" className="rediger card__micro" value="#brukerinnsikt" onClick={setCategory}>Brukerinnsikt</Button> */}
        </>
      }

      {search && !value &&
        <>
          <div className="rediger">
            <div className="katalogwrapper"><Heading level="2" aria-live="polite" className="kataloglabel" size="medium">Kategorier</Heading></div>
            {category.categories.map((category, i) => (
              <div key={i}>
                <Button type="submit" className="searchsuggestion" value={category.slug} onClick={setCategory}>{category.name}</Button>
              </div>
            ))}
          </div>
        </>
      }

      {value &&
        <div className="rediger">
          {searchActivate && value && foundUsers && foundUsers.length > 0 &&
            <div className="katalogwrapper"><Heading level="2" aria-live="polite" className="kataloglabel" size="medium"> {foundUsers.length} {foundUsers.length > 1 ? (<>resultater</>) : (<>resultat</>)}</Heading></div>}
          {value && foundUsers && foundUsers.length > 0 ? (
            foundUsers.map((tool) => (
              <LinkPanel key={tool.id} className="rediger" href={tool.link} target="_blank" rel="noopener noreferrer">
                <LinkPanel.Title>
                  {tool.name}
                </LinkPanel.Title>
                {tool.description != "@" &&
                  <LinkPanel.Description>
                    {tool.description}
                  </LinkPanel.Description>
                }
              </LinkPanel>
            ))
          ) : (
            <>
              {value &&
                <Alert className="rediger" variant="error">
                  <Heading spacing size="small" level="3">
                    Fant ingen verktøy
                  </Heading>
                  <p>Vi legger stadig til nye verktøy, <Link target="_blank" href="https://forms.office.com/r/UyFMJsLfKM?lang=nb-NO">tips oss gjerne</Link> om hva du forsøkte å søke etter, så legger vi det til.</p>
                  <p>Hilsen Team ResearchOps.</p>
                </Alert>
              }
            </>
          )}
        </div>
      }
    </>
  );
}

export default MySearch;